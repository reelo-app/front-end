import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import ContentWrapper from '@/components/global/ContentWrapper';
import { Colors } from '@/constants/Colors';
import ProfilePicture from '@/components/Profile/ProfilePicture';
import ProfileInfo from '@/components/Profile/ProfileInfo';
import { UserProps, VideoProps } from '@/types/Interfaces';
import ActionButton from '@/components/global/ActionButton';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import VideoDisplay from '@/components/Profile/VideoDisplay';
import { USER_DATA } from '@/constants/MockData';


const VIDEO_DATA: VideoProps[] = Array.from({ length: 10 }, (_, index) => ({
  id: `video-${index}`,
  thumbnail: `https://picsum.photos/200/300?random=${index + 2}`,
  likes: { amount: Math.floor(Math.random() * 1000) },
  views: Math.floor(Math.random() * 5000),
}));


export default function ProfileScreen() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? 'light'].background,
    },
    scrollViewContent: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    profileHeader: {
      alignItems: 'center',
      width: '100%',
    },
    profileContent: {
      marginTop: 20,
    },
    tabButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? 'light'].underlineColor,
      marginBottom: 10,
    },
    videoGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    profileNavbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    profileTopText: { 
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 24,
      paddingTop: 2,
    },
  });
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ContentWrapper>
        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
          <View style={styles.profileNavbar}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
            <ThemedText style={ styles.profileTopText }>{USER_DATA[0].name}</ThemedText>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="ellipsis-horizontal" size={24} color={Colors[colorScheme ?? 'light'].text} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileHeader}>
            <ProfilePicture userData={USER_DATA[0]} />
            <ProfileInfo userData={USER_DATA[0]} />
            <ActionButton title="Follow" onPress={() => {}} width={250}/>
          </View>
          <View style={styles.profileContent}>
            <View style={styles.tabButton}>
              <Ionicons name="albums" size={24} color={Colors[colorScheme ?? 'light'].selectedIcon} />
              <ThemedText style={{ color: Colors[colorScheme ?? 'light'].selectedIcon, marginLeft: 5 }}>Videos</ThemedText>
            </View>
            <View style={styles.videoGrid}>
              {VIDEO_DATA.map((video) => (
                <VideoDisplay key={video.id} videoSource={video} />
              ))}
            </View>
          </View>
        </ScrollView>
      </ContentWrapper>
    </SafeAreaView>
  );
}
