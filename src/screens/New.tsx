import { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, TextBase, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaibleWeekDays = ['Domingo', 'Segunda-feira', 'Terceira-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {
  const [weekDays, setWeekdays] = useState<number[]>([]);
  const [title, setTitle] = useState<string>('');

  const handleToggleWeekDay = (weekDayIndex:number) => {
    if(weekDays.includes(weekDayIndex)){
      setWeekdays( prevState => prevState.filter(
        weekDay => weekDay !== weekDayIndex
      ));
    } else {
      setWeekdays( prevState => [...prevState, weekDayIndex]);
    }
  }

  const handleCreateNewHabit = async() => {
    try {
      if(!title.trim() || weekDays.length === 0) {
        return Alert.alert("Novo Hábito", "Informe o nome do hábito e escolha a periodicidade")
      }

      await api.post('/habits', { title, weekDays });
      setTitle('');
      setWeekdays([]);
      Alert.alert("Novo Hábito", "Hábito criado com sucesso")
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", "Não foi possível criar o novo hábito")
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>

        <Text className="mt-6 text-white font-extrabold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          placeholder="Ex: Exercícios, Dormir bem"
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          Qual a recorrência?
        </Text>

        {
          avaibleWeekDays.map((weekDay, index) => (
            <Checkbox
              key={weekDay}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}
            />
          ))
        }

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>

        </TouchableOpacity>

       </ScrollView>
    </View>
  )
}