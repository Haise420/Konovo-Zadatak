# Konovo-Zadatak
Konovo Zadatak sa https://zadatak.konovo.rs/


Ovaj projekat je Full-Stack aplikacija napravljena u okviru zadatka.
Backend je rađen u Django-u, a frontend u React-u (Create React App).

# Pokretanje projekta

## 1. Kloniranje repozitorijuma
```bash
  git clone https://github.com/Haise420/konovo_zadatak.git
  cd konovo_zadatak
```

## 2. Pokretanje Django backenda
  (Prethodno instaliraj Python 3.10+ i pip)
  
  Instaliraj Python zavisnosti:
  ```bash
  python -m venv venv
  venv\Scripts\activate      # na Windowsu
  source venv/bin/activate  # na Linux/Mac
  
  pip install -r requirements.txt
  ```
  Pokreni migracije i Django server:
  ```bash
  python manage.py migrate
  python manage.py runserver
   ```
  
  ### Backend će biti dostupan na http://127.0.0.1:8000


## 3. Pokretanje React frontenda
 #### U drugom terminalu, uđi u frontend folder:
  
  ```bash
  cd frontend
  npm install
  npm start
  ```
  #### Frontend će biti dostupan na http://localhost:3000
  

### Napomena
  React i Django komuniciraju preko API-ja (/api/...)

##### React šalje JWT token u svim zahtevima ka backendu

### Licence
Ovaj projekat je napravljen kao zadatak. Slobodno koristi za učenje ili dalji razvoj.
