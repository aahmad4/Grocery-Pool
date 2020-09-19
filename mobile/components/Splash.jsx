import React, { useEffect, useState, useRef } from "react";
import { StyleSheet } from "react-native";
import Logo from "./Logo";
import { Surface, Title, ProgressBar, Colors } from "react-native-paper";

export default function Splash(props) {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = 0;
    const loadingInterval = setInterval(() => {
      setProgress((previousProgress) => previousProgress + 1);
      progressRef.current += 1;
      if (Math.floor(progressRef.current) === 10) {
        clearInterval(loadingInterval);
        props.setIsLoading(false);
      }
    }, 200);
  }, []);

  return (
    <Surface style={styles.container}>
      <Surface style={styles.content}>
        <Surface style={styles.logoContainer}>
          <Logo />
        </Surface>
        <Title style={styles.title}>Grocery Pool</Title>
        <Surface style={styles.progress}>
          <ProgressBar progress={progress / 10} color={Colors.blue800} />
        </Surface>
      </Surface>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  content: {
    marginTop: "50%",
  },
  logoContainer: {
    marginBottom: 60,
  },
  title: {
    marginTop: 15,
    fontSize: 32,
    textAlign: "center",
    padding: 10,
  },
  progress: {
    marginTop: 25,
  },
});
