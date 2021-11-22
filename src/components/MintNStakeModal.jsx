import React from 'react'
import Modal from 'react-modal'
import Container from './Container'
import WoodButton from './WoodButton'

const MintNStakeModal = ({
  modalIsOpen,
  onClick,
  loading,
  closeModal
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      style={{content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: 'transparent',
      }}}
      contentLabel="Mint & Stake Modal"
      onRequestClose={closeModal}
    >
      <Container>
        <div className="w-full flex flex-col items-center overflow-hidden" style={{zIndex:1000}}>
          <div className="font-console text-2xl drop-text text-center mb-5">
            REMINDER
          </div>
          <div className="font-console text-center" style={{maxWidth: '500px'}}>
            You can claim the $WOOL on staked sheep at anytime.<br/><br/>

            <span className="text-red">HOWEVER</span><br/><br/>

            You cannot remove a Sheep from the Barn for 2 days after staking it. Shearing your Sheep will reset this timer.
          </div>
          <WoodButton title={'MINT & STAKE'} width={250} height={40} onClick={onClick} loading={loading} fontSize={20}/>
        </div>
        
      </Container>
    </Modal>
  )
}

export default MintNStakeModal
