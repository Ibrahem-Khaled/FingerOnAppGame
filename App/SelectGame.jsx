import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SelectGameScreen = () => {
    const users = [
        {
            id: 1,
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1711109631731-f3ae890bf2ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8'
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: 'https://images.unsplash.com/photo-1713746888221-2cc8dc37cad7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8'
        },
    ];
    const nav = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Game</Text>
            {users.map(user => (
                <TouchableOpacity key={user.id} style={styles.userContainer}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => { nav.navigate('game') }} style={styles.button}>
                <Text style={styles.buttonText}>game</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Options</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userName: {
        fontSize: 18,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SelectGameScreen;
