import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Studio from "@/components/pages/Studio";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <motion.div 
      className="min-h-screen bg-anime-bg font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        <Route path="/" element={<Studio />} />
      </Routes>
    </motion.div>
  );
}

export default App;