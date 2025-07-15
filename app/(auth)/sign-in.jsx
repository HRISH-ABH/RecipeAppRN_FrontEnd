import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { authStyles } from "../../assets/styles/auth.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";

import { Ionicons } from "@expo/vector-icons";

const SignInScreen = () => {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error,please fill all the fields");
      return;
    }
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status == "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      } else {
        Alert.alert("Error,sign in failed,Please try again!");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (e) {
      Alert.alert("Error", e.errors?.[0]?.message || "Sign in failed!");
      console.error(JSON.stringify(e, null, 2));
    } finally {
      setLoading = false;
    }
  };
  return (
    <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Tune this if needed
>
    <View style={authStyles.container}>
      {/* prevents ui overflow when keyboard pops up */}
   
        <ScrollView
         
        keyboardShouldPersistTaps="handled"
          contentContainerStyle={[authStyles.scrollContent,{flexGrow:1}]}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"
            ></Image>
          </View>

          <Text style={authStyles.title}>Welcome Chef!</Text>

          {/* Form */}
          <View style={authStyles.formContainer}>
            {/* email */}
            <TextInput
              style={authStyles.textInput}
              placeholder="Enter Email"
              placeholderTextColor={COLORS.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {/* password */}

            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.textInput}
                placeholder="Enter Password"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={authStyles.eyeButton}
                onPress={() => setshowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.textLight}
                />
              </TouchableOpacity>
            </View>

            {/* signinButton */}
            <TouchableOpacity
              style={[
                authStyles.authButton,
                loading && authStyles.buttonDisabled,
              ]}
              onPress={handleSignIn}
              disabled={loading}
              activeOpacity={0.6}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Signing In.." : "Sign In"}
              </Text>
            </TouchableOpacity>
            {/* sign up Screen */}

            <TouchableOpacity
              style={authStyles.linkContainer}
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text style={authStyles.linkText}>
                 Don&apos;t have an Account ?{" "}
                <Text style={authStyles.link}>Sign-Up</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    
    </View>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;
