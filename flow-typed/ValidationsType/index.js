type ValidationsType = {
  [message: MessageType]: (forgedAttributes: ForgedAttributesType) => boolean,
}
