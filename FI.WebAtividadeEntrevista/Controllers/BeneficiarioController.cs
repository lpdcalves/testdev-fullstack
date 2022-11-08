using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                if (bo.VerificarExistencia(model.CPF, model.IdCliente))
                {
                    Response.StatusCode = 400;
                    return Json($"Esse cliente já possui um beneficiário com CPF: {model.CPF}.");
                }
                else
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        CPF = model.CPF,
                        Nome = model.Nome,
                        IdCliente = model.IdCliente
                    });


                    return Json("Cadastro efetuado com sucesso");
                }
            }
        }

        [HttpPost]
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bo.Alterar(new Beneficiario()
                {
                    Id = model.Id,
                    CPF = model.CPF,
                    Nome = model.Nome,
                });

                return Json("Beneficiário alterado com sucesso.");
            }
        }

        [HttpDelete]
        public JsonResult Excluir(long id)
        {
            Response.StatusCode = 204;
            return Json("Beneficiário excluído com sucesso.");
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long Id)
        {
            try
            {
                List<Beneficiario> clientes = new BoBeneficiario().Consultar(Id);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = 10 });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }
    }
}
