import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { COLORS } from "../../constants/colors";

export default function TabsLayout() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          elevation: 5,
          height: 70,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            index: "restaurant",
            search: "search",
            favorites: "heart",
          };
          const iconName = icons[route.name] || "ellipse";
          return (
            <Ionicons
              name={iconName}
              size={focused ? 30 : 26}
              color={color}
              style={{ marginBottom: -2 }}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Recipes" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
    </Tabs>
  );
}
