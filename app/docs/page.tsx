"use client";

import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import * as XLSX from "xlsx";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";

type FormData = {
  id: string;
  predio: string;
  andar: string;
  setor: string;
  marca: string;
  modelo: string;
  patrimonio: string;
};

export default function Docs() {
  const [data, setData] = useState<FormData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));
        const data = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as FormData
        );
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "data", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleExport = () => {
    const exportData = data.map(({ id, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "data.xlsx");
  };

  return (
    <div>
      <button onClick={handleExport}>Exportar para Excel</button>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Predio</TableColumn>
          <TableColumn>Andar</TableColumn>
          <TableColumn>Setor</TableColumn>
          <TableColumn>Marca</TableColumn>
          <TableColumn>Modelo</TableColumn>
          <TableColumn>Patrimonio</TableColumn>
          <TableColumn>Ações</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.predio}</TableCell>
              <TableCell>{row.andar}</TableCell>
              <TableCell>{row.setor}</TableCell>
              <TableCell>{row.marca}</TableCell>
              <TableCell>{row.modelo}</TableCell>
              <TableCell>{row.patrimonio}</TableCell>
              <TableCell>
                <button onClick={() => handleDelete(row.id)}>Excluir</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
