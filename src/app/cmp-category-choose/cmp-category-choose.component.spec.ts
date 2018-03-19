import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';


import { CmpCategoryChooseComponent } from './cmp-category-choose.component';

import { SvVizCategoriesService } from '../sv-viz-categories/sv-viz-categories.service';
import { VizCategory } from '../viz-category';



describe('CmpCategoryChooseComponent', () => {
  let component: CmpCategoryChooseComponent;
  let fixture: ComponentFixture<CmpCategoryChooseComponent>;
  let vizCategories:VizCategory[];
  let getVizCategoriesSpy: jasmine.Spy;


  beforeEach(async(() => {
    vizCategories = [{ id: 'one', name: 'VizCategory One', children: [
                        { id: 'one-a', name: 'VizCategory One a', children: []},
                        { id: 'one-b', name: 'VizCategory One b', children: []},
                        ] },
                     { id: 'two', name: 'VizCategory Two', children: [
                        { id: 'two-a', name: 'VizCategory Two a', children: []},
                        { id: 'two-b', name: 'VizCategory Two b', children: []},
                       ]}];
    const vizCategoriesService = jasmine.createSpyObj('SvVizCategoriesService', ['getVizCategories'])
    getVizCategoriesSpy = vizCategoriesService.getVizCategories.and.returnValue(of(vizCategories));
    TestBed.configureTestingModule({
      declarations: [ CmpCategoryChooseComponent ],
      providers: [{provide:SvVizCategoriesService, useValue: vizCategoriesService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpCategoryChooseComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('root elements', () =>{
      it('should show root categories by default', () => {
       const categoriesInDom = fixture.nativeElement.querySelectorAll(".category");
       expect(categoriesInDom[0].textContent).toContain('VizCategory One');
       expect(categoriesInDom[1].textContent).toContain('VizCategory Two');
      });

      it("When clicked category, should replace categories with it's children", () =>{
       const categoriesInDom = fixture.nativeElement.querySelectorAll(".category");
       categoriesInDom[0].click();
       fixture.detectChanges();
       const subCategoriesInDom = fixture.nativeElement.querySelectorAll(".category");
       expect(subCategoriesInDom[0].textContent).toContain('VizCategory One a');
       expect(subCategoriesInDom[1].textContent).toContain('VizCategory One b');
      })
  });

  describe('child elements', () =>{
    
  })


});
