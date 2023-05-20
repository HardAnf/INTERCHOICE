using Interchoice.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Interchoice
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "public")))
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "public"));
            // Log.Logger = new LoggerConfiguration()
            // .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
            // .Enrich.FromLogContext()
            // .WriteTo.File("MyLog.log")
            // .CreateLogger();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                // .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
