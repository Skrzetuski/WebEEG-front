export const description = 'Uruchom sesję EEG i zarządzaj przebiegiem badania.';
export const title = 'Przeprowadzenie badania';

import { EEGChannelCard } from '../../components/eeg/EEGChannelCard';
import EEGMultiViewerFull from '../../components/eeg/EEGMultiViewerFull';
import EEGMultiViewerFit from '../../components/eeg/EEGMultwiViewerFit';

export const EEG_CHANNELS = [
  "Fp1", "Fp2",
];

export default function DashboardPage() {

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8 w-full'>
      {EEG_CHANNELS.map((label, idx) => (
        <EEGChannelCard
          key={label}
          channelIndex={idx}
          title={`Czujnik ${label}`}
          sampleRate={3000}
          voltsPerDiv={15}
          secondsVisible={1}
        />
      ))}
    </div>
    
      <div className="w-full h-screen bg-black">
      <EEGMultiViewerFit numChannels={8} title="Sesja EEG" desiredGap={6} showLegend={true} reserveLegendPx={100} reserveHeaderPx={100} sampleRate={3000} voltsPerDiv={15} secondsVisible={10}/> 
      <EEGMultiViewerFull numChannels={8} sampleRate={3000} voltsPerDiv={15} channelGap={10} secondsVisible={3}/> 
      </div>

    </>

  );
}