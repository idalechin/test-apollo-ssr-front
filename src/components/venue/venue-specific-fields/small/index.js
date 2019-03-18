import React from 'react';
import _get from 'lodash/get';

import PeopleIcon from '../ic_people_black_24px.svg';
import OutdoorIndoorIcon from '../Outdoor-Indoor.svg';
import IndoorIcon from '../Indoor.svg';
import OutdoorIcon from '../Outdoor.svg';
import SpecificField from '../../../specific-field';

import '../style.scss';

export default (props) => {
  const { category , specificFields} = props;

  const { venue_capacity, venue_ceremony } = specificFields;

  const ceremonyIcon = () => {
    if(venue_ceremony){
      switch (venue_ceremony) {
        case 57:
          return IndoorIcon;
        case 58:
          return OutdoorIcon;
        case 59:
          return OutdoorIndoorIcon;
      }
    }
  };

  return (
    <div className="venue-specific-fields venue-specific-fields--small venue-specific-fields--not-margin">
      { venue_capacity && <SpecificField icon={PeopleIcon} approximately={true} option={venue_capacity} optionName='venue_capacity' category={category}/>}
      { venue_ceremony && <SpecificField onlyIcon={true} icon={ceremonyIcon()} option={venue_ceremony} optionName='venue_ceremony' category={category}/>}
    </div>
  )
}