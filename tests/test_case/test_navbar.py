import unittest
from selenium import webdriver
import time
from ddt import ddt, data, unpack, file_data
import yaml, os

cur_path = os.path.abspath(os.path.dirname(__file__))


@ddt
class ForTest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        unittest.TestCase.__init__(self, *args, **kwargs)

    def setUp(self) -> None:
        self.driver = webdriver.Chrome()

    def tearDown(self) -> None:
        # time.sleep(3)
        self.driver.quit()

    @file_data(cur_path + '/../data/' + 'navbar.yml')
    def test_navbar(self, **kwargs):
        url = 'http://localhost:3000/' + kwargs.get('url')
        print(url)
        self.driver.get(url)
        path = kwargs.get('path')
        button = kwargs.get('button')
        self.driver.find_element_by_xpath(path.format(button_name=button)).click()
        get_title = self.driver.find_element_by_xpath('//*[@id="title"]').text

        title = kwargs.get('title')
        msg = 'This is not {title_name}'
        if kwargs.get('url') == "ProjectHomePage":
            self.assertTrue(title in get_title)
        else:
            self.assertEqual(title, get_title, msg.format(title_name=title))


if __name__ == '__main__':
    unittest.main()
