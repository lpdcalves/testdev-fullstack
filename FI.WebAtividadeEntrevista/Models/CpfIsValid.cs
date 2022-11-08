﻿using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class CpfIsValid : ValidationAttribute
    {
        public CpfIsValid() { }

        public string GetErrorMessage() => $"Seu CPF não é válido";

        public override bool IsValid(object value)
        {
            string cpf = (string) value;

            if (cpf == null)
            {
                return false;
            }

            cpf = cpf.Trim().Replace(".", "").Replace("-", "");

            if (cpf.Length != 11)
            {
                return false;
            }    

            bool igual = true;

            for (int i = 1; i < 11 && igual; i++)
            {
                if (cpf[i] != cpf[0]) 
                { 
                    igual = false; 
                }
            }

            if (igual || cpf == "12345678909")
            {
                return false;
            }

            int[] numeros = new int[11];

            for (int i = 0; i < 11; i++)
            {
                numeros[i] = int.Parse(cpf[i].ToString());
            }

            int soma = 0;

            for (int i = 0; i < 9; i++)
            { 
                soma += (10 - i) * numeros[i]; 
            }

            int resultado = soma % 11;

            if (resultado == 1 || resultado == 0)
            {
                if (numeros[9] != 0)
                {
                    return false;
                }
            }
            else if (numeros[9] != 11 - resultado)
            {
                return false;
            }

            soma = 0;

            for (int i = 0; i < 10; i++)
            { 
                soma += (11 - i) * numeros[i]; 
            }

            resultado = soma % 11;

            if (resultado == 1 || resultado == 0)
            {
                if (numeros[10] != 0)
                {
                    return false;
                }
            }
            else if (numeros[10] != 11 - resultado)
            {
                return false;
            }

            return true;
        }
    }
}