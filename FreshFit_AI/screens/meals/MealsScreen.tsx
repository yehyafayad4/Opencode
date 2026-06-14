import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PrimaryButton } from '../../components/ui/buttons/PrimaryButton';
import { mockMealSuggestions, mockFridgeItems } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';
import { MealSuggestion } from '../../types';

const { width } = Dimensions.get('window');

const MealsScreen = () => {
  const [selectedMeal, setSelectedMeal] = useState<MealSuggestion | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMeals = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would fetch from AI service
      // For now, we just show the mock meals
    }, 1500);
  };

  const handleSelectMeal = (meal: MealSuggestion) => {
    setSelectedMeal(meal);
  };

  const handleCloseMealDetail = () => {
    setSelectedMeal(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Meal Generator</Text>
        <PrimaryButton 
          title="Generate Meals" 
          onPress={handleGenerateMeals}
          loading={isGenerating}
        />
      </View>

      {!isGenerating ? (
        <View style={styles.mealsSection}>
          <Text style={styles.sectionTitle}>Meals from Your Fridge</Text>
          <FlatList
            data={mockMealSuggestions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => handleSelectMeal(item)}
                style={styles.mealCard}
              >
                <View style={styles.mealImageContainer}>
                  {/* In a real app, this would be an Image component */}
                  <View style={styles.mealImagePlaceholder}>
                    <Text style={styles.mealImageText}>Meal Image</Text>
                  </View>
                </View>
                <View style={styles.mealContent}>
                  <Text style={styles.mealTitle}>{item.title}</Text>
                  <View style={styles.mealMeta}>
                    <Text style={styles.mealMetaText}>{item.prepTime + item.cookTime} min</Text>
                    <Text style={styles.mealMetaText}>•</Text>
                    <Text style={styles.mealMetaText}>{item.servings} servings</Text>
                  </View>
                  <View style={styles.mealNutrition}>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                    <Text style={styles.nutritionValue}>{item.nutrition.calories}</Text>
                  </View>
                  <View style={styles.mealTags}>
                    {item.tags.map((tag, index) => (
                      <Text key={index} style={styles.tag}>
                        #{tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyState}>No meal suggestions available</Text>
            }
          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Generating personalized meal suggestions...</Text>
        </View>
      )}

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Meal Details</Text>
              <TouchableOpacity onPress={handleCloseMealDetail} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.detailImageContainer}>
                {/* In a real app, this would be an Image component */}
                <View style={styles.detailImagePlaceholder}>
                  <Text style={styles.detailImageText}>Meal Image</Text>
                </View>
              </View>
              <View style={styles.detailInfo}>
                <Text style={styles.detailTitle}>{selectedMeal.title}</Text>
                <View style={styles.detailMeta}>
                  <Text style={styles.detailMetaText}>Prep: {selectedMeal.prepTime} min</Text>
                  <Text style={styles.detailMetaText}>•</Text>
                  <Text style={styles.detailMetaText}>Cook: {selectedMeal.cookTime} min</Text>
                  <Text style={styles.detailMetaText}>•</Text>
                  <Text style={styles.detailMetaText}>Servings: {selectedMeal.servings}</Text>
                </View>
                <View style={styles.detailNutrition}>
                  <Text style={styles.nutritionSectionTitle}>Nutrition per serving</Text>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Calories</Text>
                    <Text style={styles.nutritionValue}>{selectedMeal.nutrition.calories}</Text>
                  </View>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Protein</Text>
                    <Text style={styles.nutritionValue}>{selectedMeal.nutrition.protein}g</Text>
                  </View>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Carbs</Text>
                    <Text style={styles.nutritionValue}>{selectedMeal.nutrition.carbs}g</Text>
                  </View>
                  <View style={styles.nutritionRow}>
                    <Text style={styles.nutritionLabel}>Fat</Text>
                    <Text style={styles.nutritionValue}>{selectedMeal.nutrition.fat}g</Text>
                  </View>
                </View>
                <Text style={styles.detailSectionTitle}>Ingredients</Text>
                <View style={styles.ingredientsList}>
                  {selectedMeal.ingredients.map((ing, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      {/* In a real app, we would look up the food item by foodId */}
                      <Text style={styles.ingredientText}>Ingredient {index + 1}</Text>
                      <Text style={styles.ingredientText}>{ing.quantity} {ing.unit}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.detailSectionTitle}>Instructions</Text>
                <View style={styles.instructionsList}>
                  {selectedMeal.instructions.map((step, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <Text style={styles.instructionNumber}>{index + 1}.</Text>
                      <Text style={styles.instructionText}>{step}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.detailTags}>
                  {selectedMeal.tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>
                      #{tag}
                    </Text>
                  ))}
                </View>
                <PrimaryButton 
                  title="Add to Meal Plan" 
                  onPress={handleCloseMealDetail}
                  style={{ width: '100%', marginTop: darkTheme.spacing.lg }}
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: darkTheme.spacing.lg,
    paddingTop: darkTheme.spacing.xxxl + 20, // Status bar
    paddingBottom: darkTheme.spacing.md,
  },
  title: {
    fontSize: darkTheme.typography.h2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  mealsSection: {
    paddingHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.lg,
  },
  sectionTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  mealCard: {
    flexDirection: 'row',
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    padding: darkTheme.spacing.md,
    marginBottom: darkTheme.spacing.sm,
  },
  mealImageContainer: {
    width: 80,
    height: 80,
    marginRight: darkTheme.spacing.md,
  },
  mealImagePlaceholder: {
    flex: 1,
    backgroundColor: darkTheme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: darkTheme.borderRadius.sm,
  },
  mealImageText: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  mealContent: {
    flex: 1,
  },
  mealTitle: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.xs,
  },
  mealMeta: {
    flexDirection: 'row',
    marginBottom: darkTheme.spacing.sm,
  },
  mealMetaText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  mealNutrition: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: darkTheme.spacing.sm,
  },
  nutritionLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  nutritionValue: {
    fontSize: darkTheme.typography.body3.fontSize,
    fontWeight: '500' as const,
    color: darkTheme.colors.textPrimary,
  },
  mealTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: darkTheme.colors.primary,
    color: darkTheme.colors.textOnPrimary,
    fontSize: darkTheme.typography.caption.fontSize,
    paddingHorizontal: darkTheme.spacing.xs,
    paddingVertical: darkTheme.spacing.xs,
    borderRadius: darkTheme.borderRadius.sm,
    marginRight: darkTheme.spacing.xs,
    marginBottom: darkTheme.spacing.xs,
  },
  emptyState: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
    textAlign: 'center',
    paddingVertical: darkTheme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: darkTheme.typography.h5.fontSize,
    color: darkTheme.colors.textPrimary,
  },
  // Modal styles
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.lg,
    padding: darkTheme.spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
  },
  modalTitle: {
    fontSize: darkTheme.typography.h5.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  modalCloseButton: {
    padding: darkTheme.spacing.xs,
  },
  modalCloseText: {
    fontSize: darkTheme.typography.h6.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  modalBody: {
  },
  detailImageContainer: {
    width: '100%',
    height: 200,
    marginBottom: darkTheme.spacing.md,
  },
  detailImagePlaceholder: {
    flex: 1,
    backgroundColor: darkTheme.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: darkTheme.borderRadius.md,
  },
  detailImageText: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
  },
  detailInfo: {
  },
  detailTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  detailMeta: {
    flexDirection: 'row',
    marginBottom: darkTheme.spacing.md,
  },
  detailMetaText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  detailNutrition: {
    marginVertical: darkTheme.spacing.md,
  },
  nutritionSectionTitle: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginBottom: darkTheme.spacing.sm,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: darkTheme.spacing.xs,
  },
  detailSectionTitle: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginVertical: darkTheme.spacing.md,
  },
  ingredientsList: {
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: darkTheme.spacing.xs,
  },
  ingredientText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  instructionsList: {
  },
  instructionItem: {
    marginVertical: darkTheme.spacing.sm,
  },
  instructionNumber: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.primary,
    fontWeight: '600' as const,
    marginRight: darkTheme.spacing.sm,
    minWidth: 20,
  },
  instructionText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: darkTheme.spacing.md,
  },
});

export default MealsScreen;