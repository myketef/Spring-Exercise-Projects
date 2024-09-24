def print_upper_words(words, must_start_with=None):
    """Print each word in uppercase that starts with specific letters."""
    for word in words:
        if must_start_with is None or word[0].lower() in must_start_with:
            print(word.upper())

# Test the function
print_upper_words(["hello", "hey", "egg","goodbye", "balls", "yo", "yes"], must_start_with={"h", "y", "e"})
