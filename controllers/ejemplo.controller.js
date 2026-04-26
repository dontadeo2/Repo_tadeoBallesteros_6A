import Ejemplo from "../models/ejemplo.model.js";
import mongoose from "mongoose";
import express from "express";

export const getALLEjemplo = async (req, res) => {
    console.log("obtieniendo ejemplos...".blue);
    try {
        const ejemplos = await Ejemplo.find({}, { __v: 0 });
        if (ejemplos.length === 0) {
            return res.status(404).json({ msg: "No se encontraron ejemplos" });
        }
        return res.status(200).json({ ejemplos });
    } catch (error) {
        console.error("Error al obtener los ejemplos:".red, error);
        res.status(500).json({ error: "Error al obtener los ejemplos" });
    }
};


export const getEjemploById = async (req, res) => {
    console.log("obteniendo ejemplo por ID...".blue);
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }
        const ejemplo = await Ejemplo.findById(id);
        if (!ejemplo) {
            return res.status(404).json({ error: "Ejemplo no encontrado" });
        }
        return res.status(200).json({ ejemplo });


    } catch (error) {
        return res.status(500).json({ error: "Error al obtener el ejemplo" });
    }
}


export const postEjemplo = async (req, res) => {
    console.log("creando un ejemplo post".blue);
    const body  = req.body;
    const ejemplo = new Ejemplo(body);
    try {
        const validationError = ejemplo.validateSync();
        if (validationError) {
           const errors = Object.values(validationError.errors).map(err => err.message);
              return res.status(400).json({ error: "Error de validación", details: errors });
        }
        await ejemplo.save();
        return res.status(201).json({ msg: "Ejemplo creado exitosamente", ejemplo });
        
    } catch (error) {
        return res.status(500).json({ error: "Error al crear el ejemplo" });
    }

}

export const putEjemplo = async (req, res) => {
    console.log("actualizando un ejemplo...".blue);
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!ejemplo) {
            return res.status(404).json({ error: "Ejemplo no encontrado" });
        }
        return res.status(200).json({ msg: "Ejemplo actualizado exitosamente", ejemplo });
    } catch (error) {
        return res.status(500).json({ error: "Error al actualizar el ejemplo" });
    }
}

export const deleteEjemplo = async (req, res) => {
    console.log("eliminando un ejemplo...".blue);
    const id = req.params.id;
   ; try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if (!ejemplo) {
            return res.status(404).json({ error: "Ejemplo no encontrado" });    
        }
        return res.status(200).json({ msg: "Ejemplo eliminado exitosamente", ejemplo });
    } catch (error) {
        return res.status(500).json({ error: "Error al eliminar el ejemplo" });
    }
}
    