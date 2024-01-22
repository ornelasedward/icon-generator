import { Variants, motion } from "framer-motion";

const variants = {
  initial: {
    scaleY: 0.2,
    opacity: 0,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 0.8,
      ease: "circIn",
    },
  },
} as Variants;

const ShuffleLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial="initial"
      animate="animate"
      className="flex gap-1 px-[7px]"
    >
      <motion.div variants={variants} className="h-6 w-2 bg-slate-800" />
      <motion.div variants={variants} className="h-6 w-2 bg-slate-800" />
      <motion.div variants={variants} className="h-6 w-2 bg-slate-800" />
      <motion.div variants={variants} className="h-6 w-2 bg-slate-800" />
      <motion.div variants={variants} className="h-6 w-2 bg-slate-800" />
    </motion.div>
  );
};

export default ShuffleLoader;