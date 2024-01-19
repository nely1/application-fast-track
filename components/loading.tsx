import Image from "next/image";

export const Loading = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/loader.svg'
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      
        priority={true}
      />
    </div>
  );
};

export default Loading;