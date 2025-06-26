import ProductForm from "./components/ProductForm";

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <ProductForm />
      <p className="text-2xl text-white">
        this is variable: {import.meta.env.VITE_N8N_WEBHOOK_URL}
      </p>
    </main>
  );
}

export default App;
