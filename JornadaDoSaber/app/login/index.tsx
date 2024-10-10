import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

import Checkbox from 'expo-checkbox';


import TempBar from '@/components/TempBar';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/images/placeholder.jpg')} />

      <Text style={styles.title}>Acesse</Text>
      <Text style={styles.subtitle}>com e-mail e senha para entrar</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Crie uma senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.rememberContainer}>
        <View style={styles.rememberLeft}>
          <Checkbox style={styles.checkBox} value={rememberMe} onValueChange={setRememberMe} />
          <Text style={styles.rememberText}>Lembrar minha senha</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>

        
        <Link style={styles.buttonContainer} href='/' asChild>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
        </Link>

      <View style={styles.createAccountContainer}>
        <Text style={styles.noAccountText}>Não tem conta? </Text>
        <Link href="/create-account" style={styles.createAccountText}>Criar uma conta</Link>
      </View>

      <Text style={styles.versionText}>versão 1.0.0</Text>

      <TempBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF8225',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 70,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#8E8E8E',
    opacity: 0.3
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rememberLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 10,
    color: '#666',
  },
  forgotText: {
    color: '#FF8225',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#FF8225',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  noAccountText: {
    color: '#666',
  },
  createAccountText: {
    color: '#FF8225',
    fontWeight: 'bold',
  },
  orText: {
    color: '#666',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  versionText: {
    color: '#666',
  },
  checkBox: {
    color: '#8E8E8E'
  }
});

export default LoginScreen;
