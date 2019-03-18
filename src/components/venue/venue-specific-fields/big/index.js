import React from 'react';
import _get from 'lodash/get';

import PeopleIcon from '../ic_people_black_24px.svg';
import OutdoorIndoorIcon from '../Outdoor-Indoor.svg';
import IndoorIcon from '../Indoor.svg';
import OutdoorIcon from '../Outdoor.svg';
import CateringIcon from '../catering.svg';
import CurfewIcon from '../ic_watch_later_black_24px.svg';
import BadgeIcon from '../badge.svg';
import SpecificField from '../../../specific-field';

import '../style.scss';

export default (props) => {
  const { category, specificFields} = props;

  const { venue_capacity, venue_ceremony, venue_catering, venue_curfew, venue_tags } = specificFields;

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

  const curfew = (value) => {
    const postFix = value > 720 ? 'am' : 'pm';
    const minutes = value % 60;
    const minutesCount = minutes === 0 ? '00' : minutes;
    const hours = value < 720 ? (value - minutesCount) / 60 : (value - 720 - minutesCount) / 60;
    const hoursCount = hours === 0 ? '12' : hours;
    if(value === 900){
      return 'After 2am';
    } else if (value === 480){
      return 'Before 9pm';
    } else {
      return `${hoursCount} ${postFix}`;
    }
  };

  const tags = venue_tags && venue_tags.length ? venue_tags.map(tag => tag.option).filter(tag => tag && tag.length).join(', ') : null;

  return (
    <div className="venue-specific-fields">
      { venue_capacity && <SpecificField icon={PeopleIcon} option={venue_capacity} optionName='venue_capacity' category={category}/>}
      { venue_ceremony && <SpecificField icon={ceremonyIcon()} option={venue_ceremony} optionName='venue_ceremony' category={category}/>}
      { venue_catering && <SpecificField icon={CateringIcon} option={venue_catering} optionName='venue_catering' category={category}/>}
      { venue_curfew && <SpecificField icon={CurfewIcon} option={curfew(venue_curfew)} optionName='venue_curfew' category={category}/>}
      { tags && <SpecificField icon={BadgeIcon} option={tags} optionName='venue_tags' category={category}/>}
    </div>
  )
}