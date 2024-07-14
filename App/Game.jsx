import React, { useState, useRef, useEffect } from 'react';
import { View, Text, PanResponder, Animated, StyleSheet, Dimensions } from 'react-native';

const SimpleGameScreen = () => {
    const [timer, setTimer] = useState(0);
    const [lost, setLost] = useState(false);
    const [boxVisible, setBoxVisible] = useState(false);
    const [prevTimer, setPrevTimer] = useState(0);
    const [reachedBox, setReachedBox] = useState(false);
    const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 }); // Added state for box position
    const pan = useRef(new Animated.ValueXY()).current;
    const timeoutRef = useRef(null);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const boxSize = 50;

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevTimer(timer);
            setTimer(prevTimer => prevTimer + 1);
            if (prevTimer % 5 === 0) {
                setBoxVisible(true);
                const newX = Math.random() * (screenWidth - boxSize);
                const newY = Math.random() * (screenHeight - boxSize);
                setBoxPosition({ x: newX, y: newY });
                timeoutRef.current = setTimeout(() => {
                    if (!reachedBox) {
                        setLost(true);
                        setTimer(0);
                        alert('you are lost!');
                    }
                }, 2000);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
            clearTimeout(timeoutRef.current);
        };
    }, [prevTimer, timer, reachedBox]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: pan.x,
                        dy: pan.y,
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                if (!lost && boxVisible) {
                    const xDiff = Math.abs(pan.x._value - boxPosition.x);
                    const yDiff = Math.abs(pan.y._value - boxPosition.y);
                    if (xDiff <= 20 && yDiff <= 20) {
                        setReachedBox(true);
                        setBoxVisible(false);
                        const newX = Math.random() * (screenWidth - boxSize);
                        const newY = Math.random() * (screenHeight - boxSize);
                        setBoxPosition({ x: newX, y: newY });
                        clearTimeout(timeoutRef.current);
                    } else {
                        setLost(true);
                        setTimer(0);
                        alert('you are lost!');
                    }
                }
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            {boxVisible && (
                <View style={[styles.box, { left: boxPosition.x, top: boxPosition.y }]} />
            )}
            <View
                style={styles.touchArea}
                {...panResponder.panHandlers}>
                <Animated.View style={[styles.finger, { transform: pan.getTranslateTransform() }]} />
            </View>
            <Text style={styles.timerText}>Time: {timer} seconds</Text>
            {lost && <Text style={styles.lossText}>You lost!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    touchArea: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finger: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'red',
        position: 'absolute',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'green',
        position: 'absolute',
    },
    timerText: {
        fontSize: 20,
        marginTop: 20,
    },
    lossText: {
        fontSize: 24,
        color: 'red',
        marginTop: 20,
    },
});

export default SimpleGameScreen;
