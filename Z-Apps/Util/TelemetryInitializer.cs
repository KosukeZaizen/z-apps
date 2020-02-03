using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Http;
using System;

public class TelemetryInitializer : ITelemetryInitializer
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IServiceProvider _serviceProvider;

    public TelemetryInitializer(IHttpContextAccessor httpContextAccessor, IServiceProvider serviceProvider)
    {
        _httpContextAccessor = httpContextAccessor;
        _serviceProvider = serviceProvider;
    }

    public void Initialize(ITelemetry telemetry)
    {
        var supportProperties = (ISupportProperties)telemetry;//Custom Properties設定用

        var context = _httpContextAccessor.HttpContext;
        if (context != null)
        {
            var ua = context.Request.Headers["User-Agent"].ToString();
            if (ua != null)
            {
                supportProperties.Properties["User-Agent"] = ua;
            }
        }

        var trace = telemetry as TraceTelemetry;
        if (trace != null)
        {
            if (trace.Message.Contains("userId") && trace.Message.Contains("href"))
            {
                //アクセスログ出力は、サンプリング対象から除外する
                var sampling = telemetry as ISupportSampling;
                if (sampling != null)
                {
                    sampling.SamplingPercentage = 100;
                }
            }
        }
    }
}