import random

"""Word Finder: finds random words from a dictionary."""

class WordFinder:
    """Machine for finding random words from dictionary.
    
    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True

    >>> wf.random() in ["cat", "dog", "porcupine"]
    True
    """

    def __init__(self, filePath):
        """Read words from the given file and store them in a list."""

        dict_file = open(filePath)

        self.words = self.read_file(dict_file)

        print(f"{len(self.words)} words read")

    def read_file(self, dict_file):
        """Read file and return a list of words (stripping newlines)."""

        return [word.strip() for word in dict_file
                if word.strip()]        

    def random(self):
        """Return a random word from the list of words."""

        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    """Specialized WordFinder that excludes blank lines/comments.
    
    >>> swf = SpecialWordFinder("complex.txt")
    3 words read

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True

    >>> swf.random() in ["pear", "carrot", "kale"]
    True
    """

    def read_file(self, dict_file):
        """Read file and return a list of valid words, ignoring blanks and comments."""
        
        return [word.strip() for word in dict_file 
            if word.strip() and not word.startswith('#')]
    