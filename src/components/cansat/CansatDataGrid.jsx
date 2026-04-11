import React from 'react';
import { motion } from 'framer-motion';
import AccelerometerPanel from './panels/AccelerometerPanel';
import GyroscopePanel from './panels/GyroscopePanel';
import BarometerPanel from './panels/BarometerPanel';
import EnvironmentalPanel from './panels/EnvironmentalPanel';
import GPSPanel from './panels/GPSPanel';
import MICSPanel from './panels/MICSPanel';

const CansatDataGrid = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
    >
      <motion.div variants={itemVariants}>
        <AccelerometerPanel data={data.accelerometer} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GyroscopePanel data={data.gyroscope} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <BarometerPanel data={data.barometer} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <EnvironmentalPanel data={data.scd40} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GPSPanel data={data.gps} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MICSPanel data={data.mics} />
      </motion.div>
    </motion.div>
  );
};

export default CansatDataGrid;
