FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as build-env
WORKDIR /app
COPY ./*.csproj .
RUN dotnet restore
COPY ./ .
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 as runtime
WORKDIR /app/publish
COPY --from=build-env /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "Interchoice.dll", "--urls", "http://*:5000"]


