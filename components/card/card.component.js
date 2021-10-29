import { useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';

import Image from 'next/image';
import styles from './card.module.css';

export const Card = ({
  imageUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80',
  size = 'medium',
}) => {
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80',
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={cn(classMap[size], styles.imgMotionWrapper)}
      >
        <Image
          onError={handleOnError}
          className={styles.cardImg}
          src={imgSrc}
          alt='image'
          layout='fill'
        />
      </motion.div>
    </div>
  );
};
