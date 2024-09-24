"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """Create a new serial generator, starting at the given start value."""

        self.start = self.next = start

    def generate(self):
        """Return the next sequential number."""

        current = self.next
        self.next += 1

        return current

    def reset(self):
        """Reset the generator back to the original start number."""

        self.next = self.start
    
    def __repr__(self):
        """Show useful representation of the generator."""

        return f"<SerialGenerator start={self.start} next={self.next}>"

serial = SerialGenerator(start=100)
# print(serial)

serial.generate()
# print(serial)

serial.generate()
# print(serial)

serial.reset()
# print(serial)

serial.generate()
# print(serial)