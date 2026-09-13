import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { lightTheme, fontFamily, spacing } from '../theme';
import { Card } from '../components/Card';
import { useGroceryList } from '../context/GroceryListContext';

export function GroceryListScreen() {
  const navigation = useNavigation();
  const { items, toggleChecked, removeItem, clearChecked } = useGroceryList();

  const hasChecked = items.some((item) => item.checked);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={lightTheme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Grocery List</Text>
        <Pressable onPress={clearChecked} hitSlop={8} disabled={!hasChecked}>
          <Text style={[styles.clearLabel, !hasChecked && styles.clearLabelDisabled]}>Clear</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={40} color={lightTheme.textMuted} />
            <Text style={styles.emptyTitle}>Your list is empty</Text>
            <Text style={styles.emptySubtitle}>
              Open a recipe and tap the cart icon to add its ingredients here.
            </Text>
          </View>
        ) : (
          <Card theme={lightTheme} style={styles.listCard}>
            {items.map((item, index) => (
              <Pressable
                key={item.id}
                style={[styles.row, index > 0 && styles.rowBorder]}
                onPress={() => toggleChecked(item.id)}
              >
                <View style={styles.rowLeft}>
                  <Ionicons
                    name={item.checked ? 'checkbox' : 'square-outline'}
                    size={22}
                    color={item.checked ? lightTheme.accent : lightTheme.textMuted}
                  />
                  <View>
                    <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  </View>
                </View>
                <Pressable onPress={() => removeItem(item.id)} hitSlop={8}>
                  <Ionicons name="close" size={18} color={lightTheme.textMuted} />
                </Pressable>
              </Pressable>
            ))}
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: lightTheme.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
    textAlign: 'center',
  },
  clearLabel: {
    fontFamily: fontFamily.bodySemiBold,
    fontSize: 14,
    color: lightTheme.accent,
  },
  clearLabelDisabled: {
    opacity: 0.4,
  },
  content: {
    padding: spacing.lg,
  },
  listCard: {
    padding: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  rowBorder: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(30, 42, 32, 0.08)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  itemName: {
    fontFamily: fontFamily.bodyMedium,
    fontSize: 15,
    color: lightTheme.text,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: lightTheme.textMuted,
  },
  itemQuantity: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    color: lightTheme.textMuted,
    marginTop: 1,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fontFamily.headingBold,
    fontSize: 18,
    color: lightTheme.text,
  },
  emptySubtitle: {
    fontFamily: fontFamily.body,
    fontSize: 14,
    color: lightTheme.textMuted,
    textAlign: 'center',
  },
});
