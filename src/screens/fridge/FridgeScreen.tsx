import React, { useState } from 'react';
import { View, Text, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Card } from '../../components/ui/Card';
import { PrimaryButton } from '../../components/ui/buttons/PrimaryButton';
import { mockFridgeItems, mockUser } from '../../mockData';
import { darkTheme } from '../../themes/darkTheme';
import { FoodItem } from '../../types';

const { width } = Dimensions.get('window');

const FridgeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const handleAddItem = () => {
    setSelectedItem(null);
    setModalVisible(true);
  };

  const handleEditItem = (item: FoodItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleDeleteItem = (id: string) => {
    // In a real app, this would call a service to delete the item
    console.log('Delete item:', id);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  // Group items by expiry status
  const expiringSoon = mockFridgeItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 2 && diffDays >= 0; // Expiring in 0-2 days
  });

  const useFirst = mockFridgeItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays <= 0; // Already expired or expiring today
  });

  const regularItems = mockFridgeItems.filter(item => {
    const expiryDate = new Date(item.expiryDate);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays > 2; // Expiring in more than 2 days
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Fridge</Text>
        <PrimaryButton 
          title="+ Add Item" 
          onPress={handleAddItem}
          icon="+"
        />
      </View>

       {/* Use First Section */}
       {useFirst.length > 0 ? (
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Use First</Text>
           <FlatList
             data={useFirst}
             keyExtractor={item => item.id}
             renderItem={({ item }) => (
               <View style={styles.itemContainer}>
                 <View style={styles.itemInfo}>
                   <Text style={styles.itemName}>{item.name}</Text>
                   <View style={styles.itemDetails}>
                     <Text style={styles.itemText}>{item.quantity} {item.unit}</Text>
                     <Text style={styles.itemText}>{item.category}</Text>
                   </View>
                 </View>
                 <View style={styles.itemActions}>
                   <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.actionButton}>
                     <Text style={styles.actionText}>Edit</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton}>
                     <Text style={{ color: darkTheme.colors.error }} style={styles.actionText}>Delete</Text>
                   </TouchableOpacity>
                 </View>
                 <View style={[styles.expiryBadge, styles.expiryBadgeExpired]}>
                   Expired
                 </View>
               </View>
             )}
             ListEmptyComponent={
               <Text style={styles.emptyState}>No items to use first</Text>
             }
           />
         </View>
         ) : (
           <View style={styles.emptySection}>
             <Text style={styles.emptyState}>Great! Nothing expired yet.</Text>
           </View>
         )}
       </View>
     ) : (
       <View style={styles.emptySection}>
         <Text style={styles.emptyState}>Nothing expiring soon</Text>
       </View>
     )}

      {/* Expiring Soon Section */}
      {expiringSoon.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expiring Soon</Text>
          <FlatList
            data={expiringSoon}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const expiryDate = new Date(item.expiryDate);
              const today = new Date();
              const diffTime = expiryDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <View style={styles.itemContainer}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemText}>{item.quantity} {item.unit}</Text>
                      <Text style={styles.itemText}>{item.category}</Text>
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.actionButton}>
                      <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton}>
                      <Text style={{ color: darkTheme.colors.error }} style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.expiryBadge, diffDays === 1 ? styles.expiryBadgeToday : styles.expiryBadgeSoon]}>
                    {diffDays === 1 ? 'Today' : `In ${diffDays} days`}
                  </View>
                </View>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyState}>Nothing expiring soon</Text>
            }
          />
        </View>
      ) : (
        <View style={styles.emptySection}>
          <Text style={styles.emptyState}>Nothing expiring soon</Text>
        </View>
      )}

      {/* Regular Items Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Items</Text>
        {regularItems.length > 0 ? (
          <FlatList
            data={regularItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const expiryDate = new Date(item.expiryDate);
              const today = new Date();
              const diffTime = expiryDate.getTime() - today.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <View style={styles.itemContainer}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemText}>{item.quantity} {item.unit}</Text>
                      <Text style={styles.itemText}>{item.category}</Text>
                    </View>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEditItem(item)} style={styles.actionButton}>
                      <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)} style={styles.actionButton}>
                      <Text style={{ color: darkTheme.colors.error }} style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                  {diffDays <= 7 && (
                    <View style={[styles.expiryBadge, diffDays <= 2 ? styles.expiryBadgeSoon : styles.expiryBadgeLater]}>
                      {diffDays <= 2 ? 'Soon' : `${diffDays} days`}
                    </View>
                  )}
                </View>
              );
            }}
            ListEmptyComponent={
              <Text style={styles.emptyState}>Your fridge is empty</Text>
            }
          />
        ) : (
          <View style={styles.emptySection}>
            <Text style={styles.emptyState}>Your fridge is empty</Text>
            <PrimaryButton 
              title="+ Add First Item" 
              onPress={handleAddItem}
              style={{ marginTop: darkTheme.spacing.md }}
            />
          </View>
        )}
      </View>

      {/* Add/Edit Item Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedItem ? 'Edit Item' : 'Add Item'}</Text>
              <TouchableOpacity onPress={handleModalClose} style={styles.modalCloseButton}>
                <Text style={styles.modalCloseText}>×</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              {/* Form fields would go here - simplified for MVP */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Item Name</Text>
                <View style={styles.inputContainer}>
                  {/* In a real app, this would be a TextInput */}
                  <View style={styles.inputPlaceholder}>
                    <Text style={styles.inputPlaceholderText}>Chicken Breast</Text>
                  </View>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Quantity</Text>
                <View style={styles.inputContainer}>
                 <View style={styles.inputPlaceholder}>
                     <Text style={styles.inputPlaceholderText}>2</Text>
                   </View>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Unit</Text>
                <View style={styles.inputContainer}>
                 <View style={styles.inputPlaceholder}>
                     <Text style={styles.inputPlaceholderText}>pieces</Text>
                   </View>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Category</Text>
                <View style={styles.inputContainer}>
                   <View style={styles.inputPlaceholder}>
                     <Text style={styles.inputPlaceholderText}>Protein</Text>
                   </View>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Expiry Date</Text>
                <View style={styles.inputContainer}>
                   <View style={styles.inputPlaceholder}>
                     <Text style={styles.inputPlaceholderText}>Tomorrow</Text>
                   </View>
                </View>
              </View>
              <View style={styles.modalActions}>
                <PrimaryButton 
                  title="Cancel" 
                  onPress={handleModalClose}
                  style={{ backgroundColor: darkTheme.colors.textDisabled }}
                />
                <PrimaryButton 
                  title={selectedItem ? 'Update' : 'Add'} 
                  onPress={handleModalClose}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    marginBottom: darkTheme.spacing.lg,
  },
  emptySection: {
    padding: darkTheme.spacing.lg,
    alignItems: 'center',
  },
  emptyState: {
    fontSize: darkTheme.typography.body2.fontSize,
    color: darkTheme.colors.textDisabled,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: darkTheme.typography.h4.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
    marginHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.sm,
    marginTop: darkTheme.spacing.md,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: darkTheme.spacing.md,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: darkTheme.borderRadius.md,
    marginHorizontal: darkTheme.spacing.lg,
    marginBottom: darkTheme.spacing.sm,
  },
  itemInfo: {
    flex: 1,
    marginRight: darkTheme.spacing.md,
  },
  itemName: {
    fontSize: darkTheme.typography.body2.fontSize,
    fontWeight: '600' as const,
    color: darkTheme.colors.textPrimary,
  },
  itemDetails: {
    marginTop: darkTheme.spacing.xs,
  },
  itemText: {
    fontSize: darkTheme.typography.body3.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  itemActions: {
    flexDirection: 'row',
  },
  actionButton: {
    paddingHorizontal: darkTheme.spacing.md,
    paddingVertical: darkTheme.spacing.sm,
  },
  actionText: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textSecondary,
  },
  expiryBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: darkTheme.colors.accent,
    color: darkTheme.colors.textOnAccent,
    fontSize: darkTheme.typography.caption.fontSize,
    fontWeight: '500' as const,
    paddingHorizontal: darkTheme.spacing.xs,
    paddingVertical: darkTheme.spacing.xs,
    borderRadius: darkTheme.borderRadius.sm,
  },
  expiryBadgeExpired: {
    backgroundColor: darkTheme.colors.error,
  },
  expiryBadgeSoon: {
    backgroundColor: darkTheme.colors.warning,
  },
  expiryBadgeToday: {
    backgroundColor: darkTheme.colors.error,
  },
  expiryBadgeLater: {
    backgroundColor: darkTheme.colors.secondary,
  },
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
  formGroup: {
    marginBottom: darkTheme.spacing.md,
  },
  formLabel: {
    fontSize: darkTheme.typography.caption.fontSize,
    color: darkTheme.colors.textDisabled,
    marginBottom: darkTheme.spacing.xs,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
    borderRadius: darkTheme.borderRadius.md,
    paddingHorizontal: darkTheme.spacing.sm,
  },
  inputPlaceholder: {
    paddingVertical: darkTheme.spacing.sm,
  },
  inputPlaceholderText: {
    color: darkTheme.colors.textDisabled,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: darkTheme.spacing.lg,
  },
});

export default FridgeScreen;