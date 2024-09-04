import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  playerName = '';


  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryService.resetCategories()
    this.categoryService.loadCategories();
    this.categories = this.categoryService.categories
    this.filteredCategories = this.categories;
    this.route.params.subscribe(params => {
      this.playerName = params['playerName'];
    });
  }

  filterCategories(): void {
    if (this.searchTerm.trim()) {
      this.filteredCategories = this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  resetFilter(): void {
    this.searchTerm = '';
    this.filteredCategories = [...this.categories];
  }

  selectCategory(categoryId: number): void {
    this.router.navigate(['/quiz', this.playerName, categoryId]);
  }
}
