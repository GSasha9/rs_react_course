import React from 'react';
import Section from '../../shared/ui/section/section';
import Input from '../../shared/ui/input/input';
import Button from '../../shared/ui/button/button';

export default class SearchPage extends React.Component {
  render = () => {
    return (
      <>
        <main>
          <Section>
            <Input></Input>
            <Button></Button>
          </Section>
        </main>
      </>
    );
  };
}
