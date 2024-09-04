import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:3000';
  categories: any[] = [];
  questionsByCategory: { [key: number]: any[] } = {};

  constructor(private http: HttpClient) { }

  loadCategories() {
    this.http.get(`${this.apiUrl}/categories`).subscribe((categories: any) => {

      for(const category of categories) {
        this.categories.push(category);
      }
    });
  }

  loadQuestions() {
    this.http.get(`${this.apiUrl}/questions`).subscribe((questions: any) => {
      this.questionsByCategory = {}; 

      for (const question of questions) {
        if (!this.questionsByCategory[question.categoryId]) {
          this.questionsByCategory[question.categoryId] = [];
        }

        this.http.get(`${this.apiUrl}/answers?questionId=${question.id}`).subscribe((answers: any) => {
          this.questionsByCategory[question.categoryId].push({
            id: question.id,
            question: question.questionLabel,
            answers
          });
        });
      }
    });
  }

  resetCategories() {
    this.categories = [];
    this.questionsByCategory = {};
  }
}
