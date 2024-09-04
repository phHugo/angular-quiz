import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { CategoryService } from 'src/app/shared/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  quizContent: any[] = [];
  answeredDate: Map<number, Date> = new Map();
  currentDate = new Date();
  @Input() categoryId: number = 0;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    console.log(this.categoryId);
    this.quizService.getQuizContent(this.categoryId);
    this.quizContent = this.quizService.quizContent;
  }

  onAnswerSelected(questionId: number) {
    this.answeredDate.set(questionId, new Date());
  }

  getQuestionDate(questionId: number) {
    return this.answeredDate.get(questionId) || null;
  }
}
