"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";

/**
 * MotionDiv é um wrapper que garante que o componente aceite props HTML normais
 * e props do framer-motion. Usamos uma tipagem ampla para evitar conflitos.
 */
type Props = React.HTMLAttributes<HTMLDivElement> & MotionProps & { children?: React.ReactNode };

const MotionDiv: React.FC<Props> = (props) => {
  // Desestruturamos para evitar conflito de tipos, e repassamos tudo para motion.div
  const { children, ...rest } = props as any;
  return <motion.div {...(rest as any)}>{children}</motion.div>;
};

export default MotionDiv;
