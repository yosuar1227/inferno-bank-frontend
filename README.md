# 🚀 Proyecto Frontend + Terraform Deployment

Este repositorio contiene un proyecto **Angular** utilizado para el frontend de la aplicación y una carpeta de **Terraform** para gestionar la infraestructura en la nube.

---

## 📁 Estructura del Proyecto

```
app/
├── angular.json               # Configuración principal de Angular
├── package.json               # Dependencias y scripts npm
├── tsconfig.json              # Configuración TypeScript
├── src/                       # Código fuente del frontend
│   ├── app/                   # Componentes, módulos y servicios Angular
│   ├── assets/                # Recursos estáticos (imágenes, íconos, etc.)
│   └── environments/          # Archivos de configuración de entorno
└── terraform/                 # Configuración de infraestructura
    ├── main.tf                # Archivo principal de Terraform
    ├── provider.tf            # Configuración del proveedor (AWS, Azure, GCP, etc.)
    ├── variable.tf            # Variables globales
    ├── data.tf                # Recursos de datos externos
    ├── terraform.tfstate*     # Estado de la infraestructura (no subir a Git)
    ├── terraform.tfstate.backup
    ├── terraform.lock.hcl     # Bloqueo de versiones
    └── deploy.sh              # Script de despliegue automatizado
```

---

## 🧠 Requisitos Previos

### Frontend

* [Node.js](https://nodejs.org/) v18 o superior
* [Angular CLI](https://angular.io/cli) instalado globalmente

### Infraestructura

* [Terraform](https://developer.hashicorp.com/terraform/downloads) v1.6+
* Credenciales del proveedor configuradas (por ejemplo, AWS CLI o variables de entorno)

---

## ⚙️ Instalación y Ejecución

### 1️⃣ Instalar dependencias del frontend

```bash
cd app
npm install
```

### 2️⃣ Ejecutar el servidor de desarrollo

```bash
ng serve
```

Luego abre en el navegador:
👉 [http://localhost:4200](http://localhost:4200)

---

## 🌍 Despliegue con Terraform

### 1️⃣ Inicializar Terraform

```bash
cd terraform
terraform init
```

### 2️⃣ Revisar los cambios que se aplicarán

```bash
terraform plan
```

### 3️⃣ Aplicar los cambios

```bash
terraform apply
```

### 4️⃣ (Opcional) Desplegar con el script automático

```bash
bash deploy.sh
```

---

## 🧩 Archivos importantes

| Archivo / Carpeta | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `angular.json`    | Configura cómo se compila y sirve la app Angular   |
| `package.json`    | Define dependencias y scripts npm                  |
| `main.tf`         | Infraestructura principal gestionada por Terraform |
| `variable.tf`     | Variables usadas en la configuración               |
| `deploy.sh`       | Script para automatizar el despliegue              |

---

## 🔒 .gitignore

El archivo `.gitignore` excluye:

* `node_modules/`
* `dist/`
* Archivos de estado de Terraform (`.tfstate`, `.backup`)
* Configuraciones sensibles o temporales

---

## 📜 Licencia

Este proyecto se distribuye bajo la licencia **MIT**.
Puedes usarlo, modificarlo y distribuirlo libremente, citando al autor original.

---
💼 Proyecto educativo / demostrativo de despliegue automatizado.

---
Use this url to test the website: https://d2jc6a6brmgzlw.cloudfront.net/
