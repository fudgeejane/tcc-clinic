git clone https://github.com/fudgeejane/tcc-clinic.git
cd tcc-clinic

# Install project dependencies
npm install

# Install individual dependencies (if needed)
npm install react react-dom
npm install react-router-dom
npm install firebase
npm install bootstrap
npm install bootstrap-icons
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Optional: Install Tailwind plugins
npm install -D @tailwindcss/forms @tailwindcss/typography

# Run the development server
npm run dev
