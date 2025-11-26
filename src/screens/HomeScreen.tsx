import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        {/* tombol notifikasi */}
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={28} />
        </TouchableOpacity>

        <Text style={styles.title}>LIBRARY</Text>

        {/* profile picture */}
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={require("../asset/profile.webp")}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* BURGER BUTTON */}
      <TouchableOpacity style={styles.burgerMenu}>
        <Ionicons name="menu" size={32} />
      </TouchableOpacity>

      {/* QR SECTION */}
      <View style={styles.qrContainer}>
        <View style={styles.qrBox}>
          <View style={styles.qrInner} />
        </View>
        <Text style={styles.qrText}>SHOW QR</Text>
      </View>

      {/* TOP BUKU */}
      <Text style={styles.topBukuTitle}>Top Buku</Text>

      <View style={styles.bookRow}>
        <View style={styles.book} />
        <View style={styles.book} />
        <View style={styles.book} />
        <View style={styles.book} />
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  // HEADER
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconButton: {
    padding: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },

  profileImage: {
    width: "100%",
    height: "100%",
  },

  burgerMenu: {
    marginTop: 20,
  },

  // QR SECTION
  qrContainer: {
    alignItems: "center",
    marginTop: 25,
  },

  qrBox: {
    borderWidth: 2,
    borderColor: "#4A78FF",
    borderRadius: 18,
    padding: 20,
  },

  qrInner: {
    width: 120,
    height: 120,
    backgroundColor: "#ddd",
  },

  qrText: {
    marginTop: 10,
    fontWeight: "600",
    fontSize: 16,
  },

  // TOP BUKU SECTION
  topBukuTitle: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: "bold",
  },

  bookRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 15,
  },

  book: {
    width: 60,
    height: 80,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#000",
  },
});
