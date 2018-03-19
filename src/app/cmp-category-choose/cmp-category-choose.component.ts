import { Component, OnInit, Input } from '@angular/core';
import { SvVizCategoriesService } from '../sv-viz-categories/sv-viz-categories.service';
import { VizCategory } from '../viz-category';

@Component({
  selector: 'app-cmp-category-choose',
  templateUrl: './cmp-category-choose.component.html',
  styleUrls: ['./cmp-category-choose.component.scss']
})
export class CmpCategoryChooseComponent implements OnInit {
  private selected: String;
  private categories:VizCategory[];
  private visibleCategories:VizCategory[]

  constructor(private vizCategoriesService: SvVizCategoriesService) { }

  ngOnInit() {
  	this.vizCategoriesService.getVizCategories().subscribe(
  		categories => this.setInitialCategories(categories)
  		)

  }

  setInitialCategories(categories){
  	this.categories = categories;
  	this.visibleCategories = categories;
  }
  select(id){
  	const selectedCategory = this.visibleCategories.filter(category => category.id == id)[0];
  	this.visibleCategories = selectedCategory.children;
  }

}
