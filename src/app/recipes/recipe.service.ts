import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_730,h_913/k%2Farchive%2F01410577b65b0fa720ffaf8a514172d4e4c82e4f'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://iamhomesteader.com/wp-content/uploads/2023/05/rodeo-burger-800x736.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
