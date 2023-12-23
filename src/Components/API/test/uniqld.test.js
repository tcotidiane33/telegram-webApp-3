// eslint-disable-next-line no-undef
test('Generate uniqid', () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
  
    const part1 = s4();
    const part2 = s4();
    const part3 = s4();
    const part4 = s4();
    const part5 = s4();
    const part6 = s4();
    const part7 = s4();
  
    const uniqId = part1 + part2 + '-' + part3 + '-' + part4 + '-' + part5 + '-' + part6 + part7;
  
    expect(part1).toBeDefined();
    expect(part2).toBeDefined();
    expect(part3).toBeDefined();
    expect(part4).toBeDefined();
    expect(part5).toBeDefined();
    expect(part6).toBeDefined();
    expect(part7).toBeDefined();
    expect(uniqId).toBeDefined();
  });
  