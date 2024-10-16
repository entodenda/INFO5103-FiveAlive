/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/recipes` | `/(tabs)/tabthree` | `/..\components\IngredientImport` | `/..\components\RecipeImport` | `/_sitemap` | `/explore` | `/recipes` | `/tabthree`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
