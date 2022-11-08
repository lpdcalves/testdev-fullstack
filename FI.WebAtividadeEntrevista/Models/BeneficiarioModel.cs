using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        [RegularExpression(@"[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2}", ErrorMessage = "Seu CPF não está no formato correto (verifique a pontuação).")]
        [CpfIsValid(ErrorMessage = "Seu CPF não é válido.")]
        public string CPF { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        [Required]
        public long IdCliente { get; set; }

    }    
}