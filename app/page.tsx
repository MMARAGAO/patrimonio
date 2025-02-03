"use client";

import { useState, useEffect } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Button, ButtonGroup } from "@heroui/button";
import { db } from "../firebaseConfig";
import { collection, addDoc, getDocs, DocumentData } from "firebase/firestore";

type FormData = {
  predio: string;
  andar: string;
  setor: string;
  marca: string;
  modelo: string;
  patrimonio: string;
};

export default function Home() {
  const [selectedPredio, setSelectedPredio] = useState<string | null>(null);
  const [selectedModelo, setSelectedModelo] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    predio: "",
    andar: "",
    setor: "",
    marca: "NEC",
    modelo: "",
    patrimonio: "",
  });
  const [formKey, setFormKey] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "data"));
      const data = querySnapshot.docs.map((doc) => doc.data() as FormData);
    };
    fetchData();
  }, []);

  const saveFormData = async () => {
    try {
      await addDoc(collection(db, "data"), formData);
      setMessage("Dados salvos com sucesso!");
      clearForm();
    } catch (e) {
      console.error("Error adding document: ", e);
      setMessage("Erro ao salvar os dados.");
    }
  };

  const clearForm = () => {
    setFormData({
      predio: "",
      andar: "",
      setor: "",
      marca: "NEC",
      modelo: "",
      patrimonio: "",
    });
    setSelectedPredio(null);
    setSelectedModelo(null);
    setFormKey((prevKey) => prevKey + 1); // Update the key to force re-render
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "andar" ? formatAndar(value) : value,
    }));
  };

  const formatAndar = (value: string) => {
    return value.replace(/\D/g, "") + "º";
  };

  const handleSelectPredioChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedPredio(value);
    setFormData((prevData) => ({
      ...prevData,
      predio: value,
    }));
  };

  const handleSelectModeloChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedModelo(value);
    setFormData((prevData) => ({
      ...prevData,
      modelo: value,
    }));
  };

  const edificio = [
    { label: "CEAMN", value: "CEAMN" },
    { label: "CERS", value: "CERS" },
    { label: "Bloco J", value: "Bloco J" },
  ];

  const modelo = [
    { label: "DT300 Series DTL-32D-1", value: "DT300 Series DTL-32D-1" },
    { label: "DT300 Series DTL-24D-1", value: "DT300 Series DTL-24D-1" },
    { label: "DT300 Series DRL-12D-1", value: "DT300 Series DRL-12D-1" },
    {
      label: "DTR-16D-2(WH) TEL Series i ",
      value: "DTR-16D-2(WH) TEL Series i ",
    },
    {
      label: "DTR-32D-2(WH) TEL Series i ",
      value: "DTR-32D-2(WH) TEL Series i ",
    },
    { label: "DTP-16D-1U(WH) TEL", value: "DTP-16D-1U(WH) TEL" },
    { label: "ETJ-8-1U(SW) TEL", value: "ETJ-8-1U(SW) TEL" },
    { label: "ETJ-16DC-1U(SW) TEL", value: "ETJ-16DC-1U(SW) TEL" },
    { label: "ETJ-24DS-1U(SW) TEL", value: "ETJ-24DS-1U(SW) TEL" },
    { label: "ETW—16DD-2(SW) TEL", value: "ETW—16DD-2(SW) TEL" },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-4xl font-bold">Cadastro de Patrimônio</h1>
      <form key={formKey} className="flex flex-col gap-4">
        <Select
          name="predio"
          label="Prédio"
          value={selectedPredio || ""}
          onChange={handleSelectPredioChange}
        >
          {edificio.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          name="modelo"
          label="Modelo"
          value={selectedModelo || ""}
          onChange={handleSelectModeloChange}
        >
          {modelo.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>

        <Input
          name="andar"
          placeholder="Andar"
          value={formData.andar}
          onChange={handleChange}
        />
        <Input
          name="setor"
          placeholder="Setor"
          value={formData.setor}
          onChange={handleChange}
        />
        <Input
          name="marca"
          placeholder="Marca"
          value={formData.marca}
          onChange={handleChange}
        />
        <Input
          name="patrimonio"
          placeholder="Patrimônio"
          value={formData.patrimonio}
          onChange={handleChange}
        />
        <ButtonGroup>
          <Button onPress={saveFormData}>Salvar</Button>
          <Button onPress={clearForm}>Cancelar</Button>
        </ButtonGroup>
      </form>
      {message && <div className="mt-4 text-green-500">{message}</div>}
    </section>
  );
}
