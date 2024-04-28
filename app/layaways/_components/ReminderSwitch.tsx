"use client";

import { Layaway } from "@prisma/client";
import { Flex, Switch, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  layaway: Layaway;
}

const ReminderSwitch: React.FC<Props & React.ComponentProps<typeof Switch>> = ({
  layaway,
  ...props
}) => {
  const [checked, setChecked] = useState(layaway.setReminder);

  const handleCheckedChange = async (checked: boolean) => {
    setChecked(() => checked);
    await axios.patch(`/api/layaways/${layaway.id}`, { setReminder: checked });
  };

  return (
    <Text as="label">
      <Flex gap="2">
        <Switch
          checked={checked}
          onCheckedChange={(checked) => handleCheckedChange(checked)}
          {...props}
        />
        {checked ? "On" : "Off"}
      </Flex>
    </Text>
  );
};

export default ReminderSwitch;
