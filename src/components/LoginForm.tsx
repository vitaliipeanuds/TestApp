import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

const LoginForm = ({onLogin}: {onLogin: () => void}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{login?: string; password?: string}>({});

  const validateForm = () => {
    let isValid = true;
    let newErrors: {login?: string; password?: string} = {};

    if (!login.trim()) {
      newErrors.login = 'Введіть логін';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Введіть пароль';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onLogin(); // Якщо валідація пройдена, викликаємо логіку входу
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, errors.login ? styles.inputError : null]}
        placeholder="Логін"
        value={login}
        onChangeText={setLogin}
      />
      {errors.login ? (
        <Text style={styles.errorText}>{errors.login}</Text>
      ) : null}

      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        placeholder="Пароль"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Увійти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginForm;
