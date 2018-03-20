import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvVizCategoriesService } from '../sv-viz-categories/sv-viz-categories.service';
import { VizCategory } from '../viz-category';

@Component({
  selector: 'app-cmp-category-choose',
  templateUrl: './cmp-category-choose.component.html',
  styleUrls: ['./cmp-category-choose.component.scss']
})
export class CmpCategoryChooseComponent implements OnInit {
  @Output() chosenCategoryIdChange = new EventEmitter<String>();
  categoryGridClass:String = 'col-sm-12'
  visibleCategories:VizCategory[]
  private categories:VizCategory[];


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
  	this.categoryGridClass = this.visibleCategories.length > 8?'col-sm-3':'col-sm-12';
    this.emitChosenCategory(id);
  }

  private emitChosenCategory(id){
    if(this.visibleCategories.length == 0)
      this.chosenCategoryIdChange.emit(id)    
  }

}
