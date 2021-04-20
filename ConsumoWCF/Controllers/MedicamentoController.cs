using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Web;
using System.Web.Mvc;
using ConsumoWCF.ServiceMedicamentos;

namespace ConsumoWCF.Controllers
{
    public class MedicamentoController : Controller
    {
        // GET: Medicamento
        public ActionResult Index()
        {
            ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(remove);
            return View();
        }

        private bool remove(object sender, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }

        public JsonResult listarMedicamentos()
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();
            oMedicamentosClient.ClientCredentials.UserName.UserName = "bryan";
            oMedicamentosClient.ClientCredentials.UserName.Password = "1234";
            //var lista = oMedicamentoClient.listarMedicamentos().ToList();
            var lista = oMedicamentosClient.listarMedicamentos()
                .Where(p => p.bhabilitado == 1)
                .Select(
                        p => new
                        {
                            p.iidmedicamento,
                            p.nombre,
                            p.concentracion,
                            p.nombreformafarmaceutica,
                            p.stock,
                            p.precio,
                            p.presentacion
                        }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListarFormaFarmaceutica()
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();
            var lista = oMedicamentosClient.listarFormaFarmaceutica().Select(
                p => new
                {
                    p.iidformafarmaceutica,
                    p.nombreformafarmaceutica
                }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RecuperarMedicamento(int iidMedicamento)
        {
            MedicamentosClient oMedicamentosClient = new MedicamentosClient();
            var medicamento = oMedicamentosClient.recuperarMedicamento(iidMedicamento);
            return Json(medicamento, JsonRequestBehavior.AllowGet);
        }
        public int AgregarEditarMedicamento(MedicamentoCLS oMeDicamentoCLS)
        {
            int rpta = 0;
            MedicamentosClient oMedicamentoClient = new MedicamentosClient();
            try
            {
                rpta = oMedicamentoClient.AgregarEditarMedicamento(oMeDicamentoCLS);
            }
            catch (Exception ex)
            {

                rpta = 0;
            }
            return rpta;
        }
        public int EliminarMedicamento(int iidMedicamento)
        {
            int rpta = 0;
            MedicamentosClient oMedicamentoClient = new MedicamentosClient();
            try
            {
                rpta = oMedicamentoClient.eliminarMedicamento(iidMedicamento);
            }
            catch (Exception ex)
            {
                rpta = 0;
                throw;
            }
            return rpta;
        }

    }
}