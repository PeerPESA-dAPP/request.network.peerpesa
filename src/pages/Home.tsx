import React, { useState, useEffect } from 'react';
import StakingModal from '../components/StakingModal';
import { FaStar } from 'react-icons/fa';

const Home: React.FC = () => {

  const [isStakingModalOpen, setIsStakingModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loans, setLoans] = useState<any>([]);
  const handleStakeClick = (asset: any) => {
    setSelectedAsset(asset);
    setIsStakingModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
    </div>
  );
};

export default Home;
