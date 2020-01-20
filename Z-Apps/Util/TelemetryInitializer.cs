using Microsoft.ApplicationInsights.Channel;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.DataContracts;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Net;

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
    }
}